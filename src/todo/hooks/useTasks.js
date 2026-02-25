import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import * as api from '@/todo/api';

export function useTasksQuery() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: api.fetchTasks,
    staleTime: 60000,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully');
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => api.updateTask(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(
        variables.isMove ? `Task moved successfully to ${variables.body.column}` : `Task updated successfully `
      );
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
  });
}

export function useMoveTask() {
  const mutation = useUpdateTask();
  return {
    ...mutation,
    mutate: (params) => mutation.mutate({ ...params, isMove: true }),
  };
}
