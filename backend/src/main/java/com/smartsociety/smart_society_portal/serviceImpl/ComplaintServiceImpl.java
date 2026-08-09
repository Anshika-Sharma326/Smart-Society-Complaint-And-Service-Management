package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.service.ComplaintService;
import com.smartsociety.smart_society_portal.service.NotificationService;
import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.repository.StaffRepository;
@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private NotificationService notificationService;

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
                "COMPLAINT",
                savedComplaint.getUser()
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
    public Complaint assignComplaint(Long complaintId, Long staffId) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Staff not found"));

        if (!"AVAILABLE".equalsIgnoreCase(staff.getStatus())) {
            throw new RuntimeException("Staff is currently busy");
        }

        complaint.setAssignedStaff(staff);
        complaint.setStatus("Assigned");

        staff.setStatus("BUSY");

        Integer currentComplaints = staff.getComplaints();

        if (currentComplaints == null) {
            currentComplaints = 0;
        }

        staff.setComplaints(currentComplaints + 1);

        staffRepository.save(staff);

        return complaintRepository.save(complaint);
    }
    @Override
    public Complaint updateComplaintStatus(Long complaintId, String status) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(status);

        if ("RESOLVED".equalsIgnoreCase(status)) {

            Staff staff = complaint.getAssignedStaff();

            if (staff != null) {

                staff.setStatus("AVAILABLE");

                Integer currentComplaints = staff.getComplaints();

                if (currentComplaints != null && currentComplaints > 0) {
                    staff.setComplaints(currentComplaints - 1);
                }

                staffRepository.save(staff);
            }
        }

        return complaintRepository.save(complaint);
    }
}