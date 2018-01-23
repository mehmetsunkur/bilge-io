package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SparkDestinationColumn entity.
 */
public class SparkDestinationColumnDTO implements Serializable {

    private Long id;

    private String name;

    private String type;

    private String desc;

    private Long parentTableId;

    private String parentTableName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Long getParentTableId() {
        return parentTableId;
    }

    public void setParentTableId(Long sparkDestinationTableId) {
        this.parentTableId = sparkDestinationTableId;
    }

    public String getParentTableName() {
        return parentTableName;
    }

    public void setParentTableName(String sparkDestinationTableName) {
        this.parentTableName = sparkDestinationTableName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SparkDestinationColumnDTO sparkDestinationColumnDTO = (SparkDestinationColumnDTO) o;
        if(sparkDestinationColumnDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sparkDestinationColumnDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SparkDestinationColumnDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
