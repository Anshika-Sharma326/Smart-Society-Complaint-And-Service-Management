package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Complaint;

public interface ComplaintService {

    Complaint addComplaint(Complaint complaint);

    List<Complaint> getAllComplaints();

    Complaint getComplaintById(Long id);

    Complaint updateComplaint(Long id, Complaint complaint);

    void deleteComplaint(Long id);
    List<Complaint> searchComplaint(String keyword);

}