package com.example.aep2entrega.Entitys;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import com.example.aep2entrega.Enums.Categoria;
import com.example.aep2entrega.Enums.Prioridade;
import com.example.aep2entrega.Enums.StatusTicket;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long protocolo;

    private String titulo;
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    private String descricao;
    private String localizacaoEndereco;
    private String bairro;

    @Enumerated(EnumType.STRING)
    private StatusTicket status;

    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;

    private LocalDateTime prazoSLA;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Long getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(Long protocolo) {
        this.protocolo = protocolo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocalizacaoEndereco() {
        return localizacaoEndereco;
    }

    public void setLocalizacaoEndereco(String localizacaoEndereco) {
        this.localizacaoEndereco = localizacaoEndereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public StatusTicket getStatus() {
        return status;
    }

    public void setStatus(StatusTicket status) {
        this.status = status;
    }

    public Prioridade getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Prioridade prioridade) {
        this.prioridade = prioridade;
    }

    public LocalDateTime getPrazoSLA() {
        return prazoSLA;
    }

    public void setPrazoSLA(LocalDateTime prazoSLA) {
        this.prazoSLA = prazoSLA;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
