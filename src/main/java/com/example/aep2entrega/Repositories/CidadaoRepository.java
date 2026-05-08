package com.example.aep2entrega.Repositories;

import com.example.aep2entrega.Entitys.Cidadao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CidadaoRepository extends JpaRepository<Cidadao, Integer> {
    Optional<Cidadao> findByCpf(String cpf);
}
