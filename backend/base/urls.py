from django.urls import path
from .import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/register/', views.registerUser, name='users-register'),
    path('posts/create/', views.create_post, name='posts-create'),
    path('message/create/', views.create_message,
         name='message-create'),
    path('message/group/create/', views.create_group,
         name='message-group-create'),
    path('message/group/list/<str:pk>/',
         views.list_group, name='message-group-list'),

    path('message/list/<str:pk>/', views.list_message,
         name='message-list'),
]
