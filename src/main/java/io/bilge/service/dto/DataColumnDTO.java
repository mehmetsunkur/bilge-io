package io.bilge.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import io.bilge.domain.enumeration.ColumnType;

/**
 * A DTO for the DataColumn entity.
 */
public class DataColumnDTO implements Serializable {

    private Long id;

    private String name;

    private ColumnType type;

    private Long size;

    private Boolean nullable;

    private String remarks;

    private String nativeType;

    private Boolean indexed;

    private Boolean primaryKey;

    private Long tableId;

    private String tableName;

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

    public ColumnType getType() {
        return type;
    }

    public void setType(ColumnType type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public Boolean isNullable() {
        return nullable;
    }

    public void setNullable(Boolean nullable) {
        this.nullable = nullable;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getNativeType() {
        return nativeType;
    }

    public void setNativeType(String nativeType) {
        this.nativeType = nativeType;
    }

    public Boolean isIndexed() {
        return indexed;
    }

    public void setIndexed(Boolean indexed) {
        this.indexed = indexed;
    }

    public Boolean isPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(Boolean primaryKey) {
        this.primaryKey = primaryKey;
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long dataTableId) {
        this.tableId = dataTableId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String dataTableName) {
        this.tableName = dataTableName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataColumnDTO dataColumnDTO = (DataColumnDTO) o;
        if(dataColumnDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataColumnDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataColumnDTO{" +
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
