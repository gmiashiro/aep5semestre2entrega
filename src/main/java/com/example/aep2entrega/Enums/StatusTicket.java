package com.example.aep2entrega.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusTicket {
    ABERTO(1),
    TRIAGEM(2),
    EM_ANDAMENTO(3),
    RESOLVIDO(4),
    FECHADO(5);

    private int valor;

    StatusTicket(int valor) {
        this.valor = valor;
    }

    @JsonValue
    public int getValor() {
        return valor;
    }

    @JsonCreator
    public static StatusTicket fromId(int valor) {
        for (StatusTicket s : StatusTicket.values()) {
            if (s.getValor() == valor) {
                return s;
            }
        }
        throw new IllegalArgumentException("StatusTicket inválido: " + valor);
    }
}