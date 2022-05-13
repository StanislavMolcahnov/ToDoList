package main;

import main.model.ToDoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import main.model.Work;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CaseController {
    @Autowired
    private ToDoListRepository toDoListRepository;

    @GetMapping("/works/")
    public List<Work> list() {
        Iterable<Work> workIterable = toDoListRepository.findAll();
        ArrayList<Work> works = new ArrayList<>();
        for (Work work : workIterable) {
            works.add(work);
        }
        return works;
    }

    @PostMapping("/works/")
    public int add(Work work) {
        Work newWork = toDoListRepository.save(work);
        return newWork.getId();
    }

    @DeleteMapping("/works/{id}")
    public void delete(@PathVariable int id) {
        Optional<Work> optionalWork = toDoListRepository.findById(id);
        if (optionalWork.isPresent()) {
            toDoListRepository.deleteById(id);
        }
    }

    @DeleteMapping("/works/")
    public void deleteAllWorks() {
        toDoListRepository.deleteAll();
    }

    @PutMapping("/works/{id}")
    public int update(Work work, @PathVariable int id) {
        toDoListRepository.save(work);
        return work.getId();
    }
}
