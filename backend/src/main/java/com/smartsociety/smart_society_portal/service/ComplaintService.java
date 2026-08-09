package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Complaint;

public interface ComplaintService {

    Complaint addComplaint(Complaint complaint);

    List<Complaint> getAllComplaints();

    Complaint getComplaintById(Long id);

    // Same as getComplaintById, but throws if the requesting user
    // (by their role) isn't allowed to view this particular complaint.
    Complaint getComplaintByIdForUser(Long id, Long userId);

    Complaint updateComplaint(Long id, Complaint complaint);

    void deleteComplaint(Long id);
    List<Complaint> searchComplaint(String keyword);

    // Returns complaints visible to this logged-in user, based on THEIR
    // role as stored in DB (not trusted from the client):
    // ADMIN -> all, RESIDENT -> only their own, STAFF -> only their profession's
    List<Complaint> getComplaintsForUser(Long userId);

}