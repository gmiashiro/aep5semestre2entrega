package com.example.aep2entrega.Services;

import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Enums.Categoria;
import com.example.aep2entrega.Enums.Prioridade;
import com.example.aep2entrega.Enums.StatusTicket;
import com.example.aep2entrega.Repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    public Ticket atualizarStatus(Long protocolo, StatusTicket novoStatus, String justificativa) {
        Ticket ticket = ticketRepository.findById(protocolo)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));

        ticket.setStatus(novoStatus);
        ticket.setJustificativa(justificativa);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> listarTodosTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> listarTicketsPorUsuario(Integer idUsuario) {
        return ticketRepository.findByUsuarioId(idUsuario);
    }

    public List<Ticket> listarComFiltros(Integer categoriaId, Integer prioridadeId) {
        Categoria cat = (categoriaId != null) ? Categoria.fromId(categoriaId) : null;
        Prioridade pri = (prioridadeId != null) ? Prioridade.fromId(prioridadeId) : null;

        return ticketRepository.findByFiltros(cat, pri);
    }
}
