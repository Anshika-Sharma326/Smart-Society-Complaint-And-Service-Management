package com.smartsociety.smart_society_portal.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.dto.DashboardResponse;
import com.smartsociety.smart_society_portal.repository.ComplaintRepository;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public DashboardResponse getDashboardData() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalComplaints(complaintRepository.count());

        response.setPendingComplaints(
                complaintRepository.countByStatus("Pending"));

        response.setInProgressComplaints(
                complaintRepository.countByStatus("In Progress"));

        response.setResolvedComplaints(
                complaintRepository.countByStatus("Resolved"));

        response.setTotalResidents(userRepository.count());

        return response;
    }
    }
