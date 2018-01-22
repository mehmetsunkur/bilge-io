package io.bilge.base.exceptions;

/**
 * Created by mehmet on 11/28/17.
 */
public class BilgeSchemaNotFoundException extends BilgeNotFoundException {
    public BilgeSchemaNotFoundException(String schemaName) {
        super(schemaName);
    }
}
