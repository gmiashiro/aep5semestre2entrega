package com.example.aep2entrega.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Prioridade {
    Baixa(1),
    Normal(2),
    Alta(3),
    Urgente(4);

    private int valor;

    Prioridade(int valor) {
        this.valor = valor;
    }

    @JsonValue
    public int getValor() {
        return valor;
    }

    @JsonCreator
    public static Prioridade fromId(int valor) {
        for (Prioridade p : Prioridade.values()) {
            if (p.getValor() == valor) {
                return p;
            }
        }
        throw new IllegalArgumentException("Prioridade inválida: " + valor);
    }
}