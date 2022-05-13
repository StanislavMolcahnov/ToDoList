package main;

import main.model.ToDoListRepository;
import main.model.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class DefaultController {
    @Autowired
    ToDoListRepository toDoListRepository;

    @RequestMapping("/")
    public String index(Model model){
        Iterable<Work> workIterable = toDoListRepository.findAll();
        ArrayList<Work> works = new ArrayList<>();
        for (Work work : workIterable){
            works.add(work);
        }
        model.addAttribute("works", works);

        return "index";
    }
}
