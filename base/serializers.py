from rest_framework import serializers
from base.models import Profile

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'text_average_number_errors',
            'text_minimum_number_errors',
            'text_maximum_number_errors',
            'lesson_average_speed',
            'lesson_minimum_speed',
            'lesson_maximum_speed',
      )

