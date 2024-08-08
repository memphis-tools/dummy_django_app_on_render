from django.core.exceptions import ValidationError


class MustContainsOneDigit:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError("Au moins un chiffre")

    def get_help_text(self):
        return "Au moins un chiffre"
