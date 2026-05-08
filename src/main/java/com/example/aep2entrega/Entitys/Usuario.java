package com.example.aep2entrega.Entitys;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String cpf;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCpf() {
        String cpfFormatado = "";  // 01234567890

        int x = 0;
        do {
            if (cpfFormatado.length() == 3 || cpfFormatado.length() == 7) {
                cpfFormatado += ".";
            } else if (cpfFormatado.length() == 10) {
                cpfFormatado += "-";
            } else {
                cpfFormatado += cpf.charAt(x);
                x++;
            }
        } while (cpfFormatado.length() != 13);

        // 0 1 2 . 3 4 5 . 6 7 8 - 9 0
        return cpfFormatado;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }


}
