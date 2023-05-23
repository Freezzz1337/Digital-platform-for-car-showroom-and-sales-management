package com.freezzz.backCourseWork.dto;

import com.freezzz.backCourseWork.models.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkerDTO {

    private String name;
    private String login;
    private String password;
    private long position;

}
