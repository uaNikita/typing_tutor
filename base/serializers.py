from rest_framework import serializers
from .models import Statistic

from django.contrib.auth import get_user_model

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ('id', 'num_errors', 'num_characters', 'max_speed_learning', 'max_speed_text')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username = validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('username', 'password')