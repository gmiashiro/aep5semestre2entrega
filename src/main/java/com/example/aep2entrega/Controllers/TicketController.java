package com.example.aep2entrega.Controllers;

import com.example.aep2entrega.Entitys.Cidadao;
import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Repositories.CidadaoRepository;
import com.example.aep2entrega.Services.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:63342")
public class TicketController {

    private final TicketService ticketService;
    private final CidadaoRepository cidadaoRepository;

    public TicketController(TicketService ticketService, CidadaoRepository cidadaoRepository) {
        this.ticketService = ticketService;
        this.cidadaoRepository = cidadaoRepository;
    }

    @PostMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> criarTicket(@RequestBody Ticket ticket, @PathVariable Integer idUsuario) {

        Optional<Cidadao> criadorOp = cidadaoRepository.findById(idUsuario);

        if (criadorOp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Usuário não encontrado. A sessão pode ter expirado. Por favor, faça login novamente.");
        }

        ticket.setUsuario(criadorOp.get());

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

    @GetMapping("/{protocolo}")
    public ResponseEntity<Ticket> buscarTicketGestor(
            @PathVariable Long protocolo) {

        System.out.println("Protocolo recebido: " + protocolo);

        Ticket ticket = ticketService.buscarTicketGestor(protocolo);
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

        System.out.println("teste");

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
