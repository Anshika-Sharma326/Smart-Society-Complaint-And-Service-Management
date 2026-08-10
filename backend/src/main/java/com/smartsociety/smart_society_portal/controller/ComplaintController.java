package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Complaint;
import com.smartsociety.smart_society_portal.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint) {
        return complaintService.addComplaint(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints(
            @RequestParam(required = false) Long userId) {

        // Frontend should always pass the logged-in user's id.
        // Role is looked up server-side from the DB (not trusted from client)
        // so a resident/staff cannot fake being admin by changing a param.
        if (userId != null) {
            return complaintService.getComplaintsForUser(userId);
        }

        // Fallback (no userId given) - kept for backward compatibility.
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {
        return complaintService.getComplaintById(id);
    }

    @PutMapping("/{id}")
    public Complaint updateComplaint(@PathVariable Long id,
                                     @RequestBody Complaint complaint) {
        return complaintService.updateComplaint(id, complaint);
    }

    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return "Complaint deleted successfully";
    }
    
    @GetMapping("/search")
    public List<Complaint> searchComplaint(
            @RequestParam String keyword){

        return complaintService.searchComplaint(keyword);

    }
}