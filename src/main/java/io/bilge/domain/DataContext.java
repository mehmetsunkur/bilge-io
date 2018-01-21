package io.bilge.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DataContext.
 */
@Entity
@Table(name = "data_context")
public class DataContext implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "dataContext")
    @JsonIgnore
    private Set<DataSchema> schemas = new HashSet<>();

    @ManyToOne
    private SourceDbConnection sourceConnection;

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

    public DataContext name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DataSchema> getSchemas() {
        return schemas;
    }

    public DataContext schemas(Set<DataSchema> dataSchemas) {
        this.schemas = dataSchemas;
        return this;
    }

    public DataContext addSchemas(DataSchema dataSchema) {
        this.schemas.add(dataSchema);
        dataSchema.setDataContext(this);
        return this;
    }

    public DataContext removeSchemas(DataSchema dataSchema) {
        this.schemas.remove(dataSchema);
        dataSchema.setDataContext(null);
        return this;
    }

    public void setSchemas(Set<DataSchema> dataSchemas) {
        this.schemas = dataSchemas;
    }

    public SourceDbConnection getSourceConnection() {
        return sourceConnection;
    }

    public DataContext sourceConnection(SourceDbConnection sourceDbConnection) {
        this.sourceConnection = sourceDbConnection;
        return this;
    }

    public void setSourceConnection(SourceDbConnection sourceDbConnection) {
        this.sourceConnection = sourceDbConnection;
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
        DataContext dataContext = (DataContext) o;
        if (dataContext.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataContext.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataContext{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
