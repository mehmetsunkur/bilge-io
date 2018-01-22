package io.bilge.base.exceptions;

/**
 * Created by mehmet on 11/28/17.
 */
public class BilgeNotFoundException extends BilgeRuntimeException{
    public BilgeNotFoundException(String notFoundObjectName) {
        super("Not found:" + notFoundObjectName);
    }
}
