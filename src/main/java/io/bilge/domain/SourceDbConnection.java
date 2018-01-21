package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SourceDbConnection.
 */
@Entity
@Table(name = "source_db_connection")
public class SourceDbConnection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "jhi_user")
    private String user;

    @Column(name = "pass")
    private String pass;

    @Column(name = "db_type")
    private String dbType;

    @OneToMany(mappedBy = "sourceConnection")
    @JsonIgnore
    private Set<DataContext> dataContexts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SourceDbConnection name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public SourceDbConnection url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUser() {
        return user;
    }

    public SourceDbConnection user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPass() {
        return pass;
    }

    public SourceDbConnection pass(String pass) {
        this.pass = pass;
        return this;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getDbType() {
        return dbType;
    }

    public SourceDbConnection dbType(String dbType) {
        this.dbType = dbType;
        return this;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }

    public Set<DataContext> getDataContexts() {
        return dataContexts;
    }

    public SourceDbConnection dataContexts(Set<DataContext> dataContexts) {
        this.dataContexts = dataContexts;
        return this;
    }

    public SourceDbConnection addDataContexts(DataContext dataContext) {
        this.dataContexts.add(dataContext);
        dataContext.setSourceConnection(this);
        return this;
    }

    public SourceDbConnection removeDataContexts(DataContext dataContext) {
        this.dataContexts.remove(dataContext);
        dataContext.setSourceConnection(null);
        return this;
    }

    public void setDataContexts(Set<DataContext> dataContexts) {
        this.dataContexts = dataContexts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SourceDbConnection sourceDbConnection = (SourceDbConnection) o;
        if (sourceDbConnection.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sourceDbConnection.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SourceDbConnection{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", user='" + getUser() + "'" +
            ", pass='" + getPass() + "'" +
            ", dbType='" + getDbType() + "'" +
            "}";
    }
}
