package io.bilge.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import io.bilge.domain.enumeration.ColumnType;

/**
 * A DataColumn.
 */
@Entity
@Table(name = "data_column")
public class DataColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ColumnType type;

    @Column(name = "jhi_size")
    private Long size;

    @Column(name = "nullable")
    private Boolean nullable;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "native_type")
    private String nativeType;

    @Column(name = "jhi_indexed")
    private Boolean indexed;

    @Column(name = "primary_key")
    private Boolean primaryKey;

    @ManyToOne
    private DataTable table;

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

    public DataColumn name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ColumnType getType() {
        return type;
    }

    public DataColumn type(ColumnType type) {
        this.type = type;
        return this;
    }

    public void setType(ColumnType type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public DataColumn size(Long size) {
        this.size = size;
        return this;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Boolean isNullable() {
        return nullable;
    }

    public DataColumn nullable(Boolean nullable) {
        this.nullable = nullable;
        return this;
    }

    public void setNullable(Boolean nullable) {
        this.nullable = nullable;
    }

    public String getRemarks() {
        return remarks;
    }

    public DataColumn remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getNativeType() {
        return nativeType;
    }

    public DataColumn nativeType(String nativeType) {
        this.nativeType = nativeType;
        return this;
    }

    public void setNativeType(String nativeType) {
        this.nativeType = nativeType;
    }

    public Boolean isIndexed() {
        return indexed;
    }

    public DataColumn indexed(Boolean indexed) {
        this.indexed = indexed;
        return this;
    }

    public void setIndexed(Boolean indexed) {
        this.indexed = indexed;
    }

    public Boolean isPrimaryKey() {
        return primaryKey;
    }

    public DataColumn primaryKey(Boolean primaryKey) {
        this.primaryKey = primaryKey;
        return this;
    }

    public void setPrimaryKey(Boolean primaryKey) {
        this.primaryKey = primaryKey;
    }

    public DataTable getTable() {
        return table;
    }

    public DataColumn table(DataTable dataTable) {
        this.table = dataTable;
        return this;
    }

    public void setTable(DataTable dataTable) {
        this.table = dataTable;
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
        DataColumn dataColumn = (DataColumn) o;
        if (dataColumn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataColumn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataColumn{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", size=" + getSize() +
            ", nullable='" + isNullable() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", nativeType='" + getNativeType() + "'" +
            ", indexed='" + isIndexed() + "'" +
            ", primaryKey='" + isPrimaryKey() + "'" +
            "}";
    }
}
