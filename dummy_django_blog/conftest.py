import os
import pytest
from django.contrib.auth import get_user_model
from django.core.management import call_command


@pytest.fixture(scope="session", autouse=True)
def remove_test_db(request):
    """
    Fixture to remove the db.sqlite3 file after all tests are run.
    """
    def remove_db_file():
        db_path = os.path.join(os.path.dirname(__file__), 'db.sqlite3')
        if os.path.exists(db_path):
            os.remove(db_path)
            print(f"Deleted test database: {db_path}")

    request.addfinalizer(remove_db_file)


@pytest.fixture(scope='session')
def django_db_setup(django_db_blocker):
    with django_db_blocker.unblock():
        call_command('migrate', run_syncdb=True)
        call_command('init_app')


@pytest.fixture
def authenticate_user(db):
    User = get_user_model()
    user = User.objects.create_user(username="pytest_user", password="p@ssword123", email="pytest_user@localhost")
    return user
