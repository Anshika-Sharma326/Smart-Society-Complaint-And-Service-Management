
package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.ComplaintService;
import com.smartsociety.smart_society_portal.service.NotificationService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Complaint addComplaint(Complaint complaint) {

        // Save complaint
        Complaint savedComplaint = complaintRepository.save(complaint);

        // Create notification
        Notification notification = new Notification(
                null,
                "New Complaint",
                "Your complaint '" + savedComplaint.getTitle()
                        + "' has been submitted successfully.",
                "COMPLAINT"
        );

        // Save notification
        notificationService.addNotification(notification);

        return savedComplaint;
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));
    }

    @Override
    public Complaint getComplaintByIdForUser(Long id, Long userId) {

        Complaint complaint = getComplaintById(id);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean allowed;

        switch (user.getRole()) {
            case ADMIN:
                allowed = true;
                break;

            case RESIDENT:
                allowed = complaint.getUser() != null
                        && complaint.getUser().getId().equals(userId);
                break;

            case STAFF:
                allowed = user.getProfession() != null
                        && user.getProfession().equalsIgnoreCase(complaint.getCategory());
                break;

            default:
                allowed = false;
        }

        if (!allowed) {
            // Same message as "not found" - don't reveal that it
            // exists but belongs to someone else.
            throw new ResourceNotFoundException("Complaint not found");
        }

        return complaint;
    }

    @Override
    public Complaint updateComplaint(Long id, Complaint complaint) {

        Complaint existingComplaint = complaintRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

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
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaintRepository.delete(complaint);
    }

    @Override
    public List<Complaint> searchComplaint(String keyword) {
        return complaintRepository.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public List<Complaint> getComplaintsForUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        switch (user.getRole()) {

            case ADMIN:
                // Admin sees everything
                return complaintRepository.findAll();

            case RESIDENT:
                // Resident/Owner sees only complaints they raised
                return complaintRepository.findByUser_Id(userId);

            case STAFF:
                // Staff sees only complaints matching their profession/category
                if (user.getProfession() == null || user.getProfession().isBlank()) {
                    return List.of();
                }
                return complaintRepository.findByCategoryIgnoreCase(user.getProfession());

            default:
                return List.of();
        }
    }
}