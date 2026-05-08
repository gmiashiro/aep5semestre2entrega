package com.example.aep2entrega.Services;

import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Enums.Prioridade;
import com.example.aep2entrega.Enums.StatusTicket;
import com.example.aep2entrega.Repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket criarTicket(Ticket novoTicket) {
        novoTicket.setDataCriacao(LocalDateTime.now());
        novoTicket.setStatus(StatusTicket.ABERTO);

        LocalDateTime prazo = calcularPrazoSlA(novoTicket.getPrioridade(), novoTicket.getDataCriacao());
        novoTicket.setPrazoSLA(prazo);

        return ticketRepository.save(novoTicket);
    }

    public Ticket buscarTicketCidadao(Long protocolo, Integer idUsuario) {
        return ticketRepository.findByProtocoloAndUsuarioId(protocolo, idUsuario)
                .orElse(null);
    }

    private LocalDateTime calcularPrazoSlA(Prioridade prioridade, LocalDateTime prazo) {
        if (prioridade == null) {
            return prazo.plusDays(30);
        }
        return switch (prioridade) {
            case Urgente -> prazo.plusDays(2);
            case Alta -> prazo.plusDays(7);
            case Normal -> prazo.plusDays(15);
            default -> prazo.plusDays(30);
        };
    }
}
