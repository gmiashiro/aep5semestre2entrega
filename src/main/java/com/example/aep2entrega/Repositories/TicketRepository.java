package com.example.aep2entrega.Repositories;

import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Enums.Categoria;
import com.example.aep2entrega.Enums.Prioridade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUsuarioId(Integer idUsuario);
    Optional<Ticket> findByProtocoloAndUsuarioId(Long protocolo, Integer idUsuario);
    @Query("SELECT t FROM Ticket t WHERE (:categoria IS NULL OR t.categoria = :categoria) AND (:prioridade IS NULL OR t.prioridade = :prioridade)")
    List<Ticket> findByFiltros(@Param("categoria") Categoria categoria, @Param("prioridade") Prioridade prioridade);
}
