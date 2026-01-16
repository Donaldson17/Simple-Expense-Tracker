from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expense

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Expense
        fields = ['id', 'user', 'amount', 'category', 'description', 'date', 'created_at']
        read_only_fields = ['created_at']
