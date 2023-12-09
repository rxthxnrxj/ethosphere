# utils.py
import numpy as np
import torch

from transformers import BertTokenizer, BertModel
from scipy.spatial.distance import cosine

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

from django.db import models


def get_similar_posts(target_post, all_posts, threshold=0.55):
    target_embeddings = np.frombuffer(target_post.embeddings, dtype=np.float32)
    similar_posts = []

    for post in all_posts:
        post_embeddings = post.embeddings

        # Check if post_embeddings is not None
        if post_embeddings is not None:
            post_embeddings = np.frombuffer(post_embeddings, dtype=np.float32)

            # Check if embeddings are not empty
            if target_embeddings.size > 0 and post_embeddings.size > 0:
                # Calculate cosine similarity
                similarity = 1 - cosine(target_embeddings, post_embeddings)

                # Calculate Jaccard similarity using TF-IDF
                tfidf_vectorizer = TfidfVectorizer()
                tfidf_matrix = tfidf_vectorizer.fit_transform(
                    [target_post.content, post.content])
                jaccard_similarity = linear_kernel(
                    tfidf_matrix[0], tfidf_matrix[1]).flatten()[0]

                # Combine cosine and Jaccard similarity scores
                combined_similarity = 0.7 * similarity + 0.3 * jaccard_similarity

                if combined_similarity > threshold:
                    similar_posts.append((post, combined_similarity))

    # Sort similar posts by the combined similarity score
    similar_posts = sorted(similar_posts, key=lambda x: x[1], reverse=True)

    print("Similar Posts:")
    for post, score in similar_posts:
        print(f"Score: {score:.2f}, Text: {post.content}")

    return similar_posts


def generate_bert_embeddings(post):
    # Load pre-trained BERT model and tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    # Tokenize the post content
    tokens = tokenizer(post.content, return_tensors='pt')

    # Forward pass to get embeddings
    with torch.no_grad():
        outputs = model(**tokens)
        embeddings = outputs.last_hidden_state.mean(dim=1)  # Mean pooling
    
    print(embeddings.numpy())

    # Convert embeddings to numpy array and return
    return embeddings.numpy().squeeze()
