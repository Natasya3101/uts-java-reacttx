package com.employee.be.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    // auto increment
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // kode unik acak 36
    // @UuidGenerator
    private Integer id;
    private String name;
    private String email;
    private String jabatan;
    private String divisi;
    private Integer gaji;
}
