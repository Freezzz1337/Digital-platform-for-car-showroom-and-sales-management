package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.LoginDTO;
import com.freezzz.backCourseWork.services.WorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final WorkerService workerService;

    @Autowired
    public AuthController(WorkerService workerService) {

        this.workerService = workerService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        String role = workerService.getRole(loginDTO);
        return ResponseEntity.ok(role);
    }
}


//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//    private final AuthenticationManager authenticationManager;
//    private final WorkerService workerService;
//
//    @Autowired
//    public AuthController(AuthenticationManager authenticationManager, WorkerService workerService) {
//        this.authenticationManager = authenticationManager;
//        this.workerService = workerService;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
//            );
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            String role = workerService.getRole(loginDTO);
//
//
//            session.setAttribute("role", role);
//
//
//            return ResponseEntity.ok(role);
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
//}