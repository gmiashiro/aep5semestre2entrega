package com.example.aep2entrega.Controllers;

import com.example.aep2entrega.Entitys.Ticket;
import com.example.aep2entrega.Services.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
