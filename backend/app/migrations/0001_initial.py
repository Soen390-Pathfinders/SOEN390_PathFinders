# Generated by Django 5.1.6 on 2025-03-18 20:05

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="AmenityType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Campus",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("code", models.CharField(max_length=3, unique=True)),
                (
                    "latitude",
                    models.DecimalField(decimal_places=6, max_digits=9, null=True),
                ),
                (
                    "longitude",
                    models.DecimalField(decimal_places=6, max_digits=9, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RoomType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Building",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("long_name", models.CharField(max_length=255, null=True)),
                ("code", models.CharField(max_length=3, unique=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("address", models.CharField(max_length=255, null=True)),
                ("floor_count", models.IntegerField(default=1)),
                (
                    "latitude",
                    models.DecimalField(decimal_places=6, max_digits=9, null=True),
                ),
                (
                    "longitude",
                    models.DecimalField(decimal_places=6, max_digits=9, null=True),
                ),
                (
                    "campus",
                    models.ForeignKey(
                        db_column="campus_id",
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.campus",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Floor",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("number", models.CharField(max_length=3)),
                ("code", models.CharField(blank=True, max_length=20, unique=True)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "building",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.building"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="InsidePOI",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("description", models.TextField(blank=True, null=True)),
                ("is_accessible", models.BooleanField(default=False)),
                ("x_coor", models.FloatField()),
                ("y_coor", models.FloatField()),
                (
                    "amenities",
                    models.ManyToManyField(
                        blank=True, related_name="amenities", to="app.amenitytype"
                    ),
                ),
                (
                    "floor",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.floor",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Edge",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("distance", models.FloatField(editable=False)),
                (
                    "node1",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="edges_from",
                        to="app.insidepoi",
                    ),
                ),
                (
                    "node2",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="edges_to",
                        to="app.insidepoi",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Room",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("number", models.CharField(max_length=10)),
                ("code", models.CharField(blank=True, max_length=20, unique=True)),
                ("capacity", models.PositiveIntegerField(null=True)),
                (
                    "floor",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app.floor",
                    ),
                ),
                (
                    "location",
                    models.ForeignKey(
                        blank=True,
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        to="app.insidepoi",
                    ),
                ),
                (
                    "type",
                    models.ManyToManyField(related_name="rooms", to="app.roomtype"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={
                            "unique": "A user with that username already exists."
                        },
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[
                            django.contrib.auth.validators.UnicodeUsernameValidator()
                        ],
                        verbose_name="username",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(default="", max_length=255)),
                ("email", models.EmailField(max_length=255)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        related_name="app_users_groups",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        related_name="app_users_permissions",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
