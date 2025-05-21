package com.cc.exceptions;

public class EntityAlreadyExistsException extends RuntimeException{
    public EntityAlreadyExistsException(String message){
        super(message);
    }
    public EntityAlreadyExistsException(){
        super("Entity already exists by this email!");
    }
}
