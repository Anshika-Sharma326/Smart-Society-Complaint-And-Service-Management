package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Staff;
import com.smartsociety.smart_society_portal.service.StaffService;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(
            @PathVariable Long id,
            @RequestBody Staff staff) {

        return staffService.updateStaff(id, staff);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }

    @GetMapping("/search")
    public List<Staff> searchStaff(
            @RequestParam String keyword) {

        return staffService.searchStaff(keyword);
    }
}
