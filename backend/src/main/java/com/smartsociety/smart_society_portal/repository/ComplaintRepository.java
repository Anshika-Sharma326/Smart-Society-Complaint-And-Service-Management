package com.smartsociety.smart_society_portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartsociety.smart_society_portal.entity.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStatus(String status);
    long countByStatus(String status);
    List<Complaint> findByTitleContainingIgnoreCase(String keyword);
}
