from rest_framework import generics

from .models import Task
from .serializers import TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    """
    GET /api/tasks/  -> list tasks (newest first)
    POST /api/tasks/ -> create a task
    """

    queryset = Task.objects.order_by("-created_at")
    serializer_class = TaskSerializer


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    PATCH /api/tasks/:id/  -> update/toggle completion
    DELETE /api/tasks/:id/ -> delete task
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
