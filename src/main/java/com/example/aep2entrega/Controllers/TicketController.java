package com.example.aep2entrega.Controllers;

import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Services.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> criarTicket(@RequestBody Ticket ticket) {
        Ticket novoTicket = ticketService.criarTicket(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoTicket);
    }

    @GetMapping("/{protocolo}/usuario/{idUsuario}")
    public ResponseEntity<Ticket> buscarTicketCidadao(
            @PathVariable Long protocolo,
            @PathVariable Integer idUsuario) {

        Ticket ticket = ticketService.buscarTicketCidadao(protocolo, idUsuario);
        if (ticket != null) {
            return ResponseEntity.ok(ticket);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{protocolo}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long protocolo,
            @RequestBody Ticket dadosAtualizacao) {
        try {
            Ticket ticketAtualizado = ticketService.atualizarStatus(protocolo, dadosAtualizacao.getStatus(), dadosAtualizacao.getJustificativa());
            return ResponseEntity.ok(ticketAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> listarTodosTickets(
            @RequestParam(required = false) Integer categoria,
            @RequestParam(required = false) Integer prioridade) {

        List<Ticket> tickets = ticketService.listarComFiltros(categoria, prioridade);

        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Ticket>> listarTicketsCidadao(@PathVariable Integer idUsuario) {
        List<Ticket> tickets = ticketService.listarTicketsPorUsuario(idUsuario);
        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tickets);
    }
}
