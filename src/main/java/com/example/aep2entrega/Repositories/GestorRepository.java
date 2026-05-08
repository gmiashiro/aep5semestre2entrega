package com.example.aep2entrega.Repositories;

import com.example.aep2entrega.Entitys.Gestor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GestorRepository extends JpaRepository<Gestor,Integer> {

    Optional<Gestor> findByEmail(String email);
    boolean existsByEmailOrCpf(String email, String cpf);
}
