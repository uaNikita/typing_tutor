from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username']
        )

        # ensures that the password is not stored in clear text, but as a hash
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = get_user_model()

        fields = (
            'id',
            'username',
            'password',
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }
