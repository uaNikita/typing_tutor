from rest_framework import serializers
from .models import Statistic
from django.contrib.auth.models import User


class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = ('num_errors', 'num_characters', 'max_speed_learning', 'max_speed_text')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if len(data['password']) < 10:
            raise serializers.ValidationError("мало")
        return data
