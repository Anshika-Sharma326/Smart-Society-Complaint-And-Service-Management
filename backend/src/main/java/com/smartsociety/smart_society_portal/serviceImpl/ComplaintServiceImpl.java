package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.service.ComplaintService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public Complaint addComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));
    }

    @Override
    public Complaint updateComplaint(Long id, Complaint complaint) {

        Complaint existingComplaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        existingComplaint.setTitle(complaint.getTitle());
        existingComplaint.setDescription(complaint.getDescription());
        existingComplaint.setCategory(complaint.getCategory());
        existingComplaint.setPriority(complaint.getPriority());
        existingComplaint.setStatus(complaint.getStatus());
        existingComplaint.setUser(complaint.getUser());

        return complaintRepository.save(existingComplaint);
    }

    @Override
    public void deleteComplaint(Long id) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        complaintRepository.delete(complaint);
    }

    @Override
    public List<Complaint> searchComplaint(String keyword) {
        return complaintRepository.findByTitleContainingIgnoreCase(keyword);
    }
}