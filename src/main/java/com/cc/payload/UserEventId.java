package com.cc.payload;

import java.io.Serializable;
import java.util.Objects;

public class UserEventId implements Serializable {
    private Long user;
    private Long event;

    public UserEventId() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEventId)) return false;
        UserEventId that = (UserEventId) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(event, that.event);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, event);
    }
}
