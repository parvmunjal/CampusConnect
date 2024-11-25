package com.cc.repo;

import com.cc.model.PendingApproval;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingApprovalRepo extends JpaRepository<PendingApproval,Long> {
}
