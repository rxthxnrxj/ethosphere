#request-response
from django.shortcuts import render
from django.shortcuts import get_object_or_404

#models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

#rest api setup
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

#serializers
from .serializers import *

#ML - BERT
from base.utils import generate_bert_embeddings, get_similar_posts
from transformers import pipeline
from summarizer import Summarizer
from sentence_transformers import SentenceTransformer

import spacy


# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data
    user = request.user
    print(data)
    # Process the form data and create a new post
    new_post = Post.objects.create(
        user=user,
        content=data['content'],
    )

    # Generate embeddings for the new post
    new_post_embeddings = generate_bert_embeddings(new_post)
    new_post.embeddings = new_post_embeddings
    new_post.save()

    # Retrieve similar posts excluding the same post and the posts from the user
    all_posts = Post.objects.all().exclude(_id=new_post._id).exclude(user=user)
    similar_posts = get_similar_posts(new_post, all_posts)
    serializer = SimilarPostSerializer(similar_posts, many=True)
    return Response(serializer.data)
    # return Response("Successful")


def generate_title_bert(post_text, max_title_length=50):
    model = Summarizer()
    # Extract keywords using BERT
    keywords = model(post_text, min_length=1, ratio=0.2, max_length=500)
    # Convert extracted keywords to a title, limiting the length
    title = " ".join(keywords)[:max_title_length]

    print(title)
    return title


def generate_title_from_content(content):
    text_generator = pipeline("text-generation")

    generated_title = text_generator(content, max_length=10, num_return_sequences=1)[
        0]['generated_text']

    keyword_extractor = pipeline(
        "ner", model="nlptown/bert-base-multilingual-uncased-ner", device=0)

    named_entities = keyword_extractor(content)

    keywords = [entity["word"]
                for entity in named_entities if entity["entity"] == "O"]
    num_keywords = 2
    keywords = keywords[:num_keywords]

    print("KEYOWRDSSS:", keywords)

    return generated_title.strip()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_group(request):
    data = request.data
    user = request.user
    selected_user_ids = data['users']
    selected_user_ids.append(user.id)
    group_name = generate_title_bert(data['content'])
    # Create a new group
    new_group = Group.objects.create(name=group_name)

    # Add selected users to the group
    selected_users = User.objects.filter(id__in=selected_user_ids)
    new_group.members.set(selected_users)
    # Replace with the appropriate URL name for the group list
    return Response('Group successfully created')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_group(request, pk):
    user = User.objects.get(id=pk)
    user_groups = Group.objects.filter(members=user)

    # Serialize the user groups
    serializer = GroupSerializer(user_groups, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_message(request):
    data = request.data
    print(data)
    group = get_object_or_404(Group, _id=data['grpId'])
    sender = request.user  # Assuming UserProfile is related to User
    content = data['content']

    new_message = Message.objects.create(
        group=group, sender=sender, content=content)
    serializer = MessageSerializer(new_message)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_message(request, pk):
    group = get_object_or_404(Group, _id=pk)
    messages = Message.objects.filter(group=group).order_by('timestamp')
    serializer = MessageSerializer(messages, many=True)

    return Response(serializer.data)
