package main.model;

import org.springframework.data.repository.CrudRepository;

public interface ToDoListRepository extends CrudRepository<Work, Integer> {
}
