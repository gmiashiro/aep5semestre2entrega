package com.example.aep2entrega.Repositories;

import com.example.aep2entrega.Entitys.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUsuarioId(Integer idUsuario);
    Optional<Ticket> findByProtocoloAndUsuarioId(Long protocolo, Integer idUsuario);
}
