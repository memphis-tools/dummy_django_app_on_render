from django.core.exceptions import ValidationError


class MustContainsOneDigit:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError("At least 1 digit sir")

    def get_help_text(self):
        return "At least 1 digit sir"
