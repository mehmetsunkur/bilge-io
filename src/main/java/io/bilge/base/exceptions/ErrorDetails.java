package io.bilge.base.exceptions;

import java.util.Date;

/**
 * Created by mehmet on 1/22/18.
 */
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;

    public ErrorDetails(Date timestamp, String message, String details) {
        super();
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
}
