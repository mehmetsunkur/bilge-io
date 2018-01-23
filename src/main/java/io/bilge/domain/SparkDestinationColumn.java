package io.bilge.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SparkDestinationColumn.
 */
@Entity
@Table(name = "spark_destination_column")
public class SparkDestinationColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "jhi_desc")
    private String desc;

    @ManyToOne
    private SparkDestinationTable parentTable;

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

    public SparkDestinationColumn name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public SparkDestinationColumn type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public SparkDestinationColumn desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public SparkDestinationTable getParentTable() {
        return parentTable;
    }

    public SparkDestinationColumn parentTable(SparkDestinationTable sparkDestinationTable) {
        this.parentTable = sparkDestinationTable;
        return this;
    }

    public void setParentTable(SparkDestinationTable sparkDestinationTable) {
        this.parentTable = sparkDestinationTable;
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
        SparkDestinationColumn sparkDestinationColumn = (SparkDestinationColumn) o;
        if (sparkDestinationColumn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDestinationColumn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDestinationColumn{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
